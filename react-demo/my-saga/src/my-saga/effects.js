import { PUT, TAKE } from './effectType';

export function take(actionType) {
  return { type: TAKE, actionType }
}

export function put(action) {
  return { type: PUT, action }
}