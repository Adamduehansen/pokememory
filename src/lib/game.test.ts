import { describe, test, expect } from 'vitest';
import { createGame, GameState, SelectResult } from './game';

describe('game', () => {
  describe('createGame', () => {
    test('should create card pairs', () => {
      // Arrange
      const expectedMatches = [
        {
          id: 1,
          matched: false,
        },
        {
          id: 2,
          matched: false,
        },
      ];
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      const matches = game.getPairs();

      // Assert
      expect(matches).toEqual(expectedMatches);
    });

    test('should set game state to idle', () => {
      // Arrange
      const expectedState: GameState = 'idle';

      // Act
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Assert
      expect(game.getState()).toEqual(expectedState);
    });
  });

  describe('select', () => {
    test('should return awaiting result on first select', () => {
      // Arrange
      const expectedState: SelectResult = 'await';
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      const actualState = game.select(1);

      // Assert
      expect(actualState).toEqual(expectedState);
    });

    test('should return match result on second select', () => {
      // Arrange
      const expectedState: SelectResult = 'match';
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);
      const actualState = game.select(1);

      // Assert
      expect(actualState).toEqual(expectedState);
    });

    test('should return invalid result on second select', () => {
      // Arrange
      const expectedState: SelectResult = 'invalid';
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);
      const actualState = game.select(2);

      // Assert
      expect(actualState).toEqual(expectedState);
    });

    test('should set pair as matched on match', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);
      game.select(1);
      const matchedPair = game.getPairs().find((pair) => pair.id === 1);

      // Assert
      expect(matchedPair?.matched).toEqual(true);
    });

    test('should return matched state when selected pair is matched', () => {
      // Arrange
      const expectedState: SelectResult = 'matched';
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);
      game.select(1);
      const actualState = game.select(1);

      // Assert
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('getSelectedId', () => {
    test('should return selected id on first select', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);

      // Assert
      expect(game.getSelectedId()).toEqual(1);
    });

    test('should return undefined after a match', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);
      game.select(1);

      // Assert
      expect(game.getSelectedId()).toBeUndefined();
    });
  });

  describe('getState', () => {
    test('should await after first select', () => {
      // Arrange
      const expectedState: GameState = 'await';
      const game = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      game.select(1);

      // Assert
      expect(game.getState()).toEqual(expectedState);
    });

    test('should be idle after second select', () => {
      // Arrange
      const expectedState: GameState = 'idle';
      const gameWithMatch = createGame({
        pokemonIds: [1, 2],
      });
      const gameWithInvalid = createGame({
        pokemonIds: [1, 2],
      });

      // Act
      gameWithMatch.select(1);
      gameWithMatch.select(1);

      gameWithInvalid.select(1);
      gameWithInvalid.select(2);

      // Assert
      expect(gameWithMatch.getState()).toEqual(expectedState);
      expect(gameWithInvalid.getState()).toEqual(expectedState);
    });
  });
});
