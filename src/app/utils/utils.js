import _ from 'lodash'

// eslint-disable-next-line import/prefer-default-export
export const sortByNameAndPriority = list => _.orderBy(list, ['highPriority', 'name'], ['desc', 'asc'])
