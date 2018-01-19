import pick from 'lodash/pick';
import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import get from 'lodash/get';

export const nameExistsInRecs = (recs, recName) => {
  const normalizedString = recName.toLowerCase().replace(/[^a-z]+/gi, '');
  console.log('normalized string', normalizedString)
}

export const getUserRecObjArray = (recs, users, key) => {
  return intersection(Object.keys(recs), getUserRecsFromKey(users, key));
}

export const getUserRecsObj = (recs, users, key) => {
  return pick(recs, getUserRecObjArray(recs, users, key));
}

export const getUserRecsFromKey = (users, key) => {
  return get(users, `${key}.recommendations`, []);
}
