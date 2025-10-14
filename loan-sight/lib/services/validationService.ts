export const validationService = {
  async runAICheckStub(
    evidenceId: string
  ): Promise<{ status: 'ok' | 'flagged' | 'pending'; reasons: string[] }> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const random = Math.random();
    
    if (random > 0.8) {
      return {
        status: 'flagged',
        reasons: [
          'Image quality is below threshold',
          'Receipt date is outside loan period',
          'Vendor information not clearly visible',
        ],
      };
    } else if (random > 0.1) {
      return {
        status: 'ok',
        reasons: [
          'Receipt clearly visible',
          'Amount matches reported value',
          'Location data verified',
          'Timestamp is valid',
        ],
      };
    } else {
      return {
        status: 'pending',
        reasons: ['AI validation in progress...'],
      };
    }
  },
};

