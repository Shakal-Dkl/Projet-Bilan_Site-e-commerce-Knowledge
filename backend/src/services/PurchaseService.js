const crypto = require('crypto');
const purchaseRepository = require('../repositories/PurchaseRepository');
const catalogRepository = require('../repositories/CatalogRepository');

class PurchaseService {
  async buyCurriculum(user) {
    // EN: Requirement from subject: inactive user cannot buy.
    // FR: Exigence du sujet : un utilisateur inactif ne peut pas acheter.
    if (!user.isActive) {
      throw new Error('Inactive account cannot buy');
    }
  }

  async purchaseCurriculum(user, curriculumId) {
    await this.buyCurriculum(user);
    // EN: Validate curriculum existence before purchase.
    // FR: Vérifie que le cursus existe avant l'achat.
    const curriculum = await catalogRepository.getCurriculumById(curriculumId);
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    // EN: Prevent duplicate purchase on same curriculum.
    // FR: Empêche un achat en double pour le même cursus.
    const alreadyBought = await purchaseRepository.hasCurriculumAccess(user.id, curriculumId);
    if (alreadyBought) {
      throw new Error('Curriculum already purchased');
    }

    // EN: Sandbox payment simulation (always paid in prototype).
    // FR: Simulation de paiement sandbox (toujours payé en prototype).
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

    // EN: Validate lesson existence before purchase.
    // FR: Vérifie que la leçon existe avant l'achat.
    const lesson = await catalogRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // EN: Prevent duplicate purchase on same lesson.
    // FR: Empêche un achat en double pour la même leçon.
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
    // EN: User can access lesson if bought directly OR through curriculum purchase.
    // FR: Accès autorisé si achat direct de la leçon OU achat du cursus.
    const hasLesson = await purchaseRepository.hasLessonAccess(userId, lesson.id);
    const hasCurriculum = await purchaseRepository.hasCurriculumAccess(userId, lesson.curriculumId);
    return hasLesson || hasCurriculum;
  }
}

module.exports = new PurchaseService();
