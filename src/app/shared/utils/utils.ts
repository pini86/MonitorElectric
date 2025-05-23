import { ZamerItem } from '../models/zamer-item';

const blankZamerItem: ZamerItem = {
  id: 0,
  date: '',
  source: '',
  phase: '',
  paramU: null,
  paramI: null,
  paramP: null,
  paramQ: null,
  paramCos: null,
};

export function generateItemData(): ZamerItem {
  const generatedItem: ZamerItem = {
    ...blankZamerItem,
    id: getRandomInt(1, 10000),
    date: String(new Date()),
    phase: getRandomPhase(),
  };

  if (generatedItem.phase !== '-') {
    generatedItem.paramU = getRandomFloat(0.22, 100);
    generatedItem.paramI = getRandomFloat(0, 100);
    generatedItem.paramP = getRandomFloat(0, 100);
    generatedItem.paramQ = getRandomFloat(0, 100);
    generatedItem.paramCos = getRandomFloat(0.5, 0.8);
  }

  return generatedItem;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
  const factor = Math.pow(10, 2);
  return (
    Math.floor(
      Math.random() * (max * factor - min * factor + 1) + min * factor
    ) / factor
  );
}

function getRandomPhase(): string {
  const phases = ['-', 'a', 'b', 'c', 'ab'];
  return phases[getRandomInt(0, phases.length - 1)];
}
