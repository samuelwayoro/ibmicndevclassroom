package com.amexiogroup.academy.icn.utils;

import javax.servlet.http.HttpServletRequest;

import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.exception.EngineRuntimeException;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginServiceCallbacks;

public class FileNetUtils {

	private PluginServiceCallbacks callbacks;
	private HttpServletRequest request;
	private PluginLogger logger;

	public FileNetUtils(final PluginServiceCallbacks callbacks, HttpServletRequest request) {
		this.callbacks = callbacks;
		this.request = request;
		this.logger = this.callbacks.getLogger();
	}

	// méthode permettant de retourner un folder recherché
	public Folder getFolder(final String repositoryId, String folderPath) {

		if (folderPath == null || folderPath.trim().isEmpty()) {
			logger.logError(this, "getFolder", this.request, "Chemin du dossier vide ou null !");
			return null;
		}

		if (!folderPath.startsWith("/")) {
			folderPath = "/" + folderPath;
		}

		ObjectStore os = this.callbacks.getP8ObjectStore(repositoryId);
		if (os == null) {
			logger.logError(this, "getFolder", this.request, "L'object Store est null");
			return null;
		}

		try {

			Folder result = Factory.Folder.fetchInstance(os, folderPath, null);

			if (result == null) {
				logger.logWarning(this, "getFolder", this.request, "Dossier introuvable : " + folderPath);
				return null;
			}

			if (result.getProperties() == null) {
				logger.logWarning(this, "getFolder", this.request, "proprietes du dossier null");
			}

			if (!result.getProperties().isPropertyPresent("Id")) {
				logger.logWarning(this, "getFolder", this.request, "Dossier ne contenant pas de proprietes");
				return null;
			}

			logger.logInfo(this, "getFolder", "Dossier bien trouve" + result.get_PathName());
			return result;

		} catch (EngineRuntimeException e) {
			if ("FNRCE0051E".equals(e.getExceptionCode())) {
				logger.logWarning(this, "getFolder", this.request, "Dossier non existant " + folderPath);
				return null;
			} else {
				logger.logDebug(this, "getFolder", this.request, "Erreur inattendue lors de la recup");
			}
		}
		return null;

	}

}
