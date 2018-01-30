import pick from 'lodash/pick';
import intersection from 'lodash/intersection';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';
import countBy from 'lodash/countBy';
import mapValues from 'lodash/mapValues';
import reject from 'lodash/reject';

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
    included: user.recommendations && user.recommendations.includes(rec.id) }
  ))

export const getCurrentRec = (recs, user) => {
  return user && recs && user.currentRecommendation && recs[user.currentRecommendation] && recs[user.currentRecommendation]
}

export const getRecCount = (recs, users) => convertObjToArray(
  mapValues(mostPopularRec(recs, users), (value, key) => ({ currentCount: value, totalCount: popularRec(recs, users, key), id: key, name: getRecById(key, recs) }))
)

export const getSortedRecCount = (recs, users) => reject(sortBy(getRecCount(recs, users), (rec) => ((rec.currentCount * 100) + (rec.totalCount * 30)) * -1), ['id', 'undefined'])

export const getRecById = (id, recs) => recs[id] && recs[id].name

export const mostPopularRec = (recs, users) => {
  return countBy(convertObjToArray(users).map(user => user.absent ? undefined : user.currentRecommendation))
}

export const popularRec = (recs, users, rec) => convertObjToArray(users).filter((user) => user && user.recommendations && !user.absent && user.recommendations.includes(rec)).length
