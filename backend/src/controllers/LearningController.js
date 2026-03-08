const progressService = require('../services/ProgressService');

class LearningController {
  async validateLesson(req, res) {
    try {
      const result = await progressService.validateLesson(req.user, Number(req.params.lessonId));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listCertifications(req, res) {
    const certifications = await progressService.listUserCertifications(req.user.id);
    return res.status(200).json(certifications);
  }
}

module.exports = new LearningController();
