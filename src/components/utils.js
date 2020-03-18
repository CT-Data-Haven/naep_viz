import * as _ from 'lodash';

///////////// general
const _filterByKey = (data, key, value, first = true) => (
  first ? _.find(data, { [key]: value }) : _.filter(data, { [key]: value })
);

///////////// data reshaping & filtering
const getComparisons = (variables) => {
  // return _.keys(variables)
  return _.chain(variables)
    .keys()
    .map((v) => ({
      compare: v,
      displayCompare: variables[v].displayCompare
    }))
    .value();
};

const getExtent = (data, x) => {
  const values = _.map(data, x);
  const range = _.max(values) - _.min(values);
  const off = 0.025 * range;
  return [(_.min(values) - off), (_.max(values) + off)];
};

const sortByLoc = (data) => (
  // add level
  _.chain(data)
    .map((d) => {
      const l = d.jurisdiction === 'National' ? 1 : (d.jurisdiction === 'Connecticut' ? 2 : 3);
      return { ...d, level: l };
    })
    .sortBy((d) => -d.level)
    .value()
  // _.sortBy(data, (d) => d.jurisdiction === 'Connecticut' || d.jurisdiction === 'National')
);

const getHeadlineData = (data, value, key = 'jurisdiction') => {
  const locData = _filterByKey(data, key, value);
  return _.chain(locData)
    .omit('jurisdiction')
    .mapValues(Math.round)
    .value();
};

const sortMeta = (meta, first) => (
  _.chain(meta)
    .keys()
    .sortBy((k) => k === first ? 0 : 1)
    .value()
);

///////////// strings & display
const fmt = (d) => (
  _.isNil(d) ? 'N/A' : (d + '%')
);

const makeTitle = (lbl, capAll = false) => {
  const wrds = _.replace(lbl, /_/g, ' ');
  return capAll ? _.startCase(wrds) : _.upperFirst(wrds);
};

const compileHeader = (loc) => {
  const locHdr = loc === 'National' ? 'Nationwide' : 'In <%= location %>';
  return _.template(locHdr + ', <%= data.second %> percent of <%= second.displayGroup %> and <%= data.main %> percent of <%= main.displayGroup %> were at or above proficient in <%= _.replace(grade, /_/g, " ") %> <%= subject %>. That\'s a <%= data.gap %> point gap.');
};

///////////// viz
const colorscale = (l) => {
  // #CC6677, #882255, #6699CC
  switch (l) {
    case 'Connecticut':
      return 'rgba(136, 34, 85, 1.00)';
    case 'National':
      return 'rgba(204, 102, 119, 1.00)';
    // case location:
    //   return 'rgba(102, 153, 204, 1.00)';
    default:
      return 'rgba(135, 135, 135, 0.60)';
  }
};

//////////// routing
const makePaths = (keys) => (
  _.zipObject(keys, _.map(keys, (k) => _.replace(k, /\W/, '_')))
);


//////////////////////////

export {
  colorscale,
  compileHeader,
  fmt,
  getComparisons,
  getExtent,
  getHeadlineData,
  makePaths,
  makeTitle,
  sortByLoc,
  sortMeta
};
