'use server';

/**
 * @fileOverview This file defines a Genkit flow for arbitrating auctions in a Property Tycoon game.
 *
 * - arbitrateAuction - A function that manages the auction process and determines the winner.
 * - ArbitrateAuctionInput - The input type for the arbitrateAuction function.
 * - ArbitrateAuctionOutput - The return type for the arbitrateAuction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArbitrateAuctionInputSchema = z.object({
  property: z.string().describe('The name of the property being auctioned.'),
  bids: z
    .array(
      z.object({
        player: z.string().describe('The name of the player making the bid.'),
        amount: z.number().describe('The bid amount.'),
      })
    )
    .describe('The array of bids made in the auction, in chronological order.'),
  minimumBidIncrement: z
    .number()
    .describe(
      'The minimum increment required between subsequent bids, to prevent stalling.'
    ),
});
export type ArbitrateAuctionInput = z.infer<typeof ArbitrateAuctionInputSchema>;

const ArbitrateAuctionOutputSchema = z.object({
  winningBid: z
    .object({
      player: z.string().describe('The name of the winning player.'),
      amount: z.number().describe('The winning bid amount.'),
    })
    .nullable()
    .describe(
      'The winning bid, or null if there were no valid bids or the auction was cancelled.'
    ),
  reason: z
    .string()
    .describe(
      'A detailed explanation of the auction outcome, including any invalid bids and why a winner was or was not determined.'
    ),
});
export type ArbitrateAuctionOutput = z.infer<typeof ArbitrateAuctionOutputSchema>;

export async function arbitrateAuction(
  input: ArbitrateAuctionInput
): Promise<ArbitrateAuctionOutput> {
  return arbitrateAuctionFlow(input);
}

const arbitrateAuctionPrompt = ai.definePrompt({
  name: 'arbitrateAuctionPrompt',
  input: {schema: ArbitrateAuctionInputSchema},
  output: {schema: ArbitrateAuctionOutputSchema},
  prompt: `You are an impartial auction arbitrator for a property trading game.

You will review the bidding history for a property and determine the winning bid, ensuring all bids are valid according to the following rules:

*   Each bid must be higher than the previous bid by at least the minimum bid increment.
*   If a bid is not valid, it is ignored, and the previous valid bid remains the current high bid.
*   The auction ends when no player makes a valid bid.

Property: {{{property}}}
Bidding History:
{{#each bids}}
- Player: {{{player}}}, Amount: {{{amount}}}
{{/each}}
Minimum Bid Increment: {{{minimumBidIncrement}}}

Given the above information, determine the winning bid and provide a clear explanation of your reasoning. If there are no valid bids return null winningBid. Be precise. Consider the scenario where an auction starts, and every bid is invalid. Make sure the final response is valid JSON.

Output MUST follow the schema defined.
`,
});

const arbitrateAuctionFlow = ai.defineFlow(
  {
    name: 'arbitrateAuctionFlow',
    inputSchema: ArbitrateAuctionInputSchema,
    outputSchema: ArbitrateAuctionOutputSchema,
  },
  async input => {
    const {output} = await arbitrateAuctionPrompt(input);
    return output!;
  }
);
