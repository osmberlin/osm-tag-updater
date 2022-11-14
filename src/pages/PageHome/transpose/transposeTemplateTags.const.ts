import { TransposeTagsObject } from './typs'

// TODO TAGGING
// https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision#Dictionary:_old_vs._new_tags
// parking:lane:side:type	not specified	parking:side	yes	only if parking:lane:side is specified in old tagging - new position unspecified in this case

// Source: https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision#Dictionary:_old_vs._new_tags
export const transposeTemplate: TransposeTagsObject = {
  'parking:lane:{SIDE}=yes': {
    newTags: ['parking:{SIDE}=yes'],
  },
  'parking:lane:{SIDE}=separate': {
    newTags: ['parking:{SIDE}=separate'],
  },
  'parking:lane:{SIDE}=parallel': {
    newTags: ['parking:{SIDE}:orientation=parallel'],
  },
  'parking:lane:{SIDE}=diagonal': {
    newTags: ['parking:{SIDE}:orientation=diagonal'],
  },
  'parking:lane:{SIDE}=perpendicular': {
    newTags: ['parking:{SIDE}:orientation=perpendicular'],
  },
  'parking:lane:{SIDE}=marked': {
    newTags: ['parking:{SIDE}:markings=yes'],
    missingField: {
      key: 'parking:{SIDE}:orientation',
      values: ['parallel', 'diagonal', 'perpendicular'],
      msg: 'Please provide the orientation of parked cars. This information was not recored previously, which is one of the benefits of the new schema.',
    },
  },
  'parking:lane:{SIDE}=no': {
    newTags: ['parking:{SIDE}=no'],
  },
  'parking:lane:{SIDE}=no_parking': {
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:access=no'],
  },
  'parking:lane:{SIDE}=no_stopping': {
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:stopping=no'],
  },
  'parking:lane:{SIDE}=fire_lane': {
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:stopping:reason=fire_lane'],
  },
  'parking:lane:{SIDE}:{TYPE}=on_street': {
    newTags: ['parking:{SIDE}=lane'],
  },
  'parking:lane:{SIDE}:{TYPE}=half_on_kerb': {
    newTags: ['parking:{SIDE}=half_on_kerb'],
  },
  'parking:lane:{SIDE}:{TYPE}=on_kerb': {
    newTags: ['parking:{SIDE}=on_kerb'],
  },
  'parking:lane:{SIDE}:{TYPE}=street_side': {
    newTags: ['parking:{SIDE}=street_side'],
  },
  'parking:lane:{SIDE}:{TYPE}=lay_by': {
    newTags: ['parking:{SIDE}=street_side'],
  },
  'parking:lane:{SIDE}:{TYPE}=shoulder': {
    newTags: ['parking:{SIDE}=shoulder'],
  },
  'parking:lane:{SIDE}:{TYPE}=painted_area_only': {
    newTags: ['parking:{SIDE}'],
    missingField: {
      key: 'parking:{SIDE}',
      values: ['on_street', 'half_on_kerb', 'on_kerb', 'street_side', 'lay_by'],
      msg: 'Please provide the position of parked cars. This information was not recored previously, which is one of the benefits of the new schema.',
    },
  },
  // TODO CODE: implement `keepValue`
  'parking:lane:{SIDE}:capacity': {
    keepValue: true,
    newTags: ['parking:{SIDE}:capacity'],
  },
  'parking:condition:{SIDE}=free': {
    newTags: ['parking:{SIDE}:access=yes', 'parking:{SIDE}:fee=no'],
  },
  'parking:condition:{SIDE}=ticket': {
    newTags: ['parking:{SIDE}:access=yes', 'parking:{SIDE}:fee=yes'],
  },
  'parking:condition:{SIDE}=disc': {
    newTags: [
      'parking:{SIDE}:access=yes',
      // TODO TAGGING: note also maxstay tagging; parking:side:authentication:disc=yes is suggested to explicitly record the usage of a parking disc
    ],
  },
  'parking:condition:{SIDE}=residents': {
    newTags: ['parking:{SIDE}:access=private'],
    // TODO TAGGING: note also residents/zone tagging
  },
  'parking:condition:{SIDE}=ticket;residents': {
    newTags: ['parking:{SIDE}:access=yes', 'parking:{SIDE}:fee=yes'],
    // TODO TAGGING: note also residents/zone tagging
  },
  'parking:condition:{SIDE}=residents;ticket': {
    // same as above, just the other key kombination
    newTags: ['parking:{SIDE}:access=yes', 'parking:{SIDE}:fee=yes'],
    // TODO TAGGING: note also residents/zone tagging
  },
  'parking:condition:{SIDE}=customers': {
    newTags: ['parking:{SIDE}:access=customers'],
  },
  'parking:condition:{SIDE}=private': {
    newTags: ['parking:{SIDE}:access=private'],
  },
  'parking:condition:{SIDE}=disabled': {
    newTags: ['parking:{SIDE}:access=no', 'parking:{SIDE}:disabled=designated'],
  },
  'parking:condition:{SIDE}=loading': {
    newTags: [
      'parking:{SIDE}:access=yes',
      'parking:{SIDE}:maxstay=load-unload',
    ],
  },
  'parking:condition:{SIDE}=no_parking': {
    newTags: ['parking:{SIDE}:access=no'],
  },
  'parking:condition:{SIDE}=no_standing': {
    newTags: ['parking:{SIDE}:waiting=no'],
  },
  'parking:condition:{SIDE}=no_stopping': {
    newTags: ['parking:{SIDE}:stopping=no'],
  },
  'parking:condition:{SIDE}=no': {
    newTags: ['parking:{SIDE}:access=yes'],
    msg: 'Hint: No parking condition is now tagged as no restriction.',
  },
  // TODO TAGGING: parking:condition:side:maxstay	...	parking:side:maxstay	...
  // TODO TAGGING: parking:condition:side:residents	...	parking:side:zone	...
}
