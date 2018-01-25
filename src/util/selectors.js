import pick from 'lodash/pick';
import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';

export const nameExistsInRecs = (recs, recName) => {
  const normalizedString = recName.toLowerCase().replace(/[^a-z]+/gi, '');
}

export const getUserRecObjArray = (recs, user) => {
  return intersection(Object.keys(recs), user.recommendations);
}

export const getUserRecs = (recs, user) => {
  const s = pick(recs, getUserRecObjArray(recs, user));
  return s;
}

export const getUserRecsFromKey = (users, key) => {
  return get(users, `${key}.recommendations`, []);
}

export const sortRecsByName = (recs) => sortBy(recs, ['name'])

export const convertObjToArray = obj => keys(obj).map((key) => ({ id: key, ...obj[key] }))

export const recsAndUserRecs = (recs, user) => convertObjToArray(recs).map((rec) =>
  ({
    ...rec,
    included: user.recommendations.includes(rec.id) }
  ))
