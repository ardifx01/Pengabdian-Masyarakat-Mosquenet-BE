import documentServices from "../services/document-services.js";
import templateDocumentServices from "../services/template-document-services.js";

const createDocument = async (req, res) => {
  try {
    const createDocumentResponse = await documentServices.createDocument({ ...req.body, user_id: req.headers.authorization }, req.files);
    return res.status(createDocumentResponse.status).json(createDocumentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menyimpan dokumen."
    })
  }
}

const getDocuments = async (req, res) => {
  try {
    const getDocumentsResponse = await documentServices.getDocuments({ user_id: req.headers.authorization });
    console.log(getDocumentsResponse);
    return res.status(getDocumentsResponse.status).json(getDocumentsResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan dokumen."
    })
  }
}

const changeDocument = async (req, res) => {
  try {
    req.body.id = req.params.id;
    const updateDocumentResponse = await documentServices.editDocument(req.body, req.files);
    return res.status(updateDocumentResponse.status).json(updateDocumentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah dokumen."
    })
  }
}

const deleteDocument = async (req, res) => {
  try {
    req.body.id = Number(req.params.id);
    const deleteDocumentResponse = await documentServices.deleteDocument(req.body);
    return res.status(deleteDocumentResponse.status).json(deleteDocumentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus dokumen."
    })
  }
}

const createTemplateDocument = async (req, res) => {
  try {
    const createTemplateResponse = await templateDocumentServices.createTemplate({ ...req.body, user_id: req.headers.authorization }, req.files);
    return res.status(createTemplateResponse.status).json(createTemplateResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menyimpan template dokumen."
    })
  }
}

const getTemplateDocument = async (req, res) => {
  try {

    const getTemplatesResponse = await templateDocumentServices.getTemplates({ user_id: req.headers.authorization });
    return res.status(getTemplatesResponse.status).json(getTemplatesResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan template dokumen."
    })
  }
}

const changeTemplateDocument = async (req, res) => {
  try {
    req.body.id = req.params.id;
    const updateTemplateDocumentResponse = await templateDocumentServices.editTemplate(req.body, req.files);
    return res.status(updateTemplateDocumentResponse.status).json(updateTemplateDocumentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah template dokumen."
    })
  }
}

const deleteTemplateDocument = async (req, res) => {
  try {
    req.body.id = Number(req.params.id);
    const updateTemplateDocumentResponse = await templateDocumentServices.deleteTemplate(req.body);
    return res.status(updateTemplateDocumentResponse.status).json(updateTemplateDocumentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus template dokumen."
    })
  }
}

export default {
  createDocument,
  getDocuments,
  changeDocument,
  deleteDocument,
  createTemplateDocument,
  getTemplateDocument,
  changeTemplateDocument,
  deleteTemplateDocument
}