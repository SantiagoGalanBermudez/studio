'use server';

import { arbitrateAuction, type ArbitrateAuctionInput } from '@/ai/flows/auction-arbitrator';

export async function handleArbitrateAuction(input: ArbitrateAuctionInput) {
  try {
    const result = await arbitrateAuction(input);
    return result;
  } catch (error) {
    console.error('Error in arbitrateAuction flow:', error);
    return {
      winningBid: null,
      reason: 'An unexpected error occurred while arbitrating the auction. Please try again.',
    };
  }
}
