import { TagsNewTagsObjects } from './types'

// Source: https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision#Dictionary:_old_vs._new_tags
// Source: https://ethercalc.net/kmmtdv6273sy
export const tagsTemplates: TagsNewTagsObjects = {
  'parking:lane:{SIDE}=yes': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=yes'],
  },
  'parking:lane:{SIDE}=separate': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=separate'],
  },
  'parking:lane:{SIDE}=parallel': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:orientation=parallel'],
  },
  'parking:lane:{SIDE}=diagonal': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:orientation=diagonal'],
  },
  'parking:lane:{SIDE}=perpendicular': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:orientation=perpendicular'],
  },
  'parking:lane:{SIDE}=marked': {
    compare: 'tag',
    newTags: [
      'parking:{SIDE}:markings=yes',
      'fixme=Please provide the orientation of parked cars with parking:{SIDE}:orientation=parallel|diagonal|perpendicular',
    ],
    missingField: {
      key: 'parking:{SIDE}:orientation',
      values: ['parallel', 'diagonal', 'perpendicular'],
      msg: 'Please provide the orientation of parked cars. This information was not recored previously, which is one of the benefits of the new schema.',
    },
  },
  'parking:lane:{SIDE}=no': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=no'],
  },
  'parking:lane:{SIDE}=no_parking': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_parking'],
  },
  'parking:lane:{SIDE}=no_standing': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_standing'],
  },
  'parking:lane:{SIDE}=no_stopping': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_stopping'],
  },
  'parking:lane:{SIDE}=fire_lane': {
    compare: 'tag',
    newTags: [
      'parking:{SIDE}=no',
      'parking:{SIDE}:restriction=no_stopping',
      'parking:{SIDE}:restriction:reason=fire_lane',
    ],
  },
  'parking:lane:{SIDE}:{TYPE}=on_street': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=lane'],
  },
  'parking:lane:{SIDE}:{TYPE}=half_on_kerb': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=half_on_kerb'],
  },
  'parking:lane:{SIDE}:{TYPE}=on_kerb': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=on_kerb'],
  },
  'parking:lane:{SIDE}:{TYPE}=street_side': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=street_side'],
  },
  'parking:lane:{SIDE}:{TYPE}=lay_by': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=street_side'],
  },
  'parking:lane:{SIDE}:{TYPE}=shoulder': {
    compare: 'tag',
    newTags: ['parking:{SIDE}=shoulder'],
  },
  'parking:lane:{SIDE}:{TYPE}=painted_area_only': {
    compare: 'tag',
    newTags: [
      'fixme=Please provide the position of th eparked cars with parking:{SIDE}=on_street|street_side|etc.',
    ],
    missingField: {
      key: 'parking:{SIDE}',
      values: ['on_street', 'half_on_kerb', 'on_kerb', 'street_side', 'lay_by'],
      msg: 'Please provide the position of parked cars. This information was not recored previously, which is one of the benefits of the new schema.',
    },
  },
  'parking:lane:{SIDE}:capacity': {
    compare: 'key',
    newTags: ['parking:{SIDE}:capacity'],
  },
  'parking:condition:{SIDE}=free': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=no'],
  },
  'parking:condition:{SIDE}:conditional=free @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:fee:conditional=no @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}=ticket': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=yes'],
  },
  'parking:condition:{SIDE}=disc': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:authentication:disc=yes'],
    msg: 'Tagging `parking:{SIDE}:authentication:disc=yes` is proposed but not approved. You may want to remove it.',
  },
  'parking:condition:{SIDE}=residents': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:access=private'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
  },
  'parking:condition:{SIDE}=ticket;residents': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=yes'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
  },
  'parking:condition:{SIDE}=residents;ticket': {
    // Same as above
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=yes'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
  },
  'parking:condition:{SIDE}=customers': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:access=customers'],
  },
  'parking:condition:{SIDE}=private': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:access=private'],
  },
  'parking:condition:{SIDE}=disabled': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:access=no', 'parking:{SIDE}:disabled=designated'],
  },
  'parking:condition:{SIDE}=loading': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:restriction=loading_only'],
  },
  'parking:condition:{SIDE}=no_parking': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:restriction=no_parking'],
  },
  'parking:condition:{SIDE}:conditional=no_parking @ ({ANYTHING})': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:restriction:conditional=no_parking @ ({ANYTHING})',
    ],
  },
  'parking:condition:{SIDE}=no_standing': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:restriction=no_standing'],
  },
  'parking:condition:{SIDE}=no_stopping': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:restriction=no_stopping'],
  },
  'parking:condition:{SIDE}=no': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:restriction=none'],
    msg: 'Hint: Parking restriction unspecified.',
  },
  // TODO TAGGING: parking:condition:side:maxstay	...	parking:side:maxstay	...
  // TODO TAGGING: parking:condition:side:residents	...	parking:side:zone	...
  // TODO surface, lit
}
