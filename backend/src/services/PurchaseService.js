const crypto = require('crypto');
const purchaseRepository = require('../repositories/PurchaseRepository');
const catalogRepository = require('../repositories/CatalogRepository');

class PurchaseService {
  async buyCurriculum(user) {
    if (!user.isActive) {
      throw new Error('Inactive account cannot buy');
    }
  }

  async purchaseCurriculum(user, curriculumId) {
    await this.buyCurriculum(user);
    const curriculum = await catalogRepository.getCurriculumById(curriculumId);
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    const alreadyBought = await purchaseRepository.hasCurriculumAccess(user.id, curriculumId);
    if (alreadyBought) {
      throw new Error('Curriculum already purchased');
    }

    return purchaseRepository.create({
      userId: user.id,
      curriculumId,
      amount: curriculum.price,
      paymentProvider: 'sandbox',
      paymentStatus: 'paid',
      transactionRef: `sandbox-${crypto.randomUUID()}`,
      createdBy: user.email,
      updatedBy: user.email
    });
  }

  async purchaseLesson(user, lessonId) {
    if (!user.isActive) {
      throw new Error('Inactive account cannot buy');
    }

    const lesson = await catalogRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const alreadyBoughtLesson = await purchaseRepository.hasLessonAccess(user.id, lessonId);
    if (alreadyBoughtLesson) {
      throw new Error('Lesson already purchased');
    }

    return purchaseRepository.create({
      userId: user.id,
      lessonId,
      amount: lesson.price,
      paymentProvider: 'sandbox',
      paymentStatus: 'paid',
      transactionRef: `sandbox-${crypto.randomUUID()}`,
      createdBy: user.email,
      updatedBy: user.email
    });
  }

  async canAccessLesson(userId, lesson) {
    const hasLesson = await purchaseRepository.hasLessonAccess(userId, lesson.id);
    const hasCurriculum = await purchaseRepository.hasCurriculumAccess(userId, lesson.curriculumId);
    return hasLesson || hasCurriculum;
  }
}

module.exports = new PurchaseService();
