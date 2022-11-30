import { TagsTemplates } from './types'

// Source: https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision#Dictionary:_old_vs._new_tags
// Source: https://ethercalc.net/kmmtdv6273sy
export const tagsTemplates: TagsTemplates = {
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
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_parking'],
  },
  'parking:lane:{SIDE}=no_standing': {
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_standing'],
  },
  'parking:lane:{SIDE}=no_stopping': {
    newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:restriction=no_stopping'],
  },
  'parking:lane:{SIDE}=fire_lane': {
    newTags: [
      'parking:{SIDE}=no',
      'parking:{SIDE}:restriction=no_stopping',
      'parking:{SIDE}:restriction:reason=fire_lane',
    ],
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
    newTags: ['parking:{SIDE}:fee=no'],
  },
  'parking:condition:{SIDE}:conditional=free @ {*}': {
    // TODO, wenn :conditional mehrere @-Zeiten hat, dann entweder splitten oder warning für manuelle Bearbeitung
    newTags: ['parking:{SIDE}:fee:conditional=no @ {*}'],
  },
  'parking:condition:{SIDE}=ticket': {
    newTags: ['parking:{SIDE}:fee=yes'],
  },
  'parking:condition:{SIDE}=disc': {
    newTags: ['parking:{SIDE}:authentication:disc=yes'],
    msg: 'Tagging `parking:{SIDE}:authentication:disc=yes` is proposed but not approved. You may want to remove it.',
  },
  'parking:condition:{SIDE}=residents': {
    newTags: ['parking:{SIDE}:access=private'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
  },
  'parking:condition:{SIDE}=ticket;residents': {
    newTags: ['parking:{SIDE}:fee=yes'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
  },
  'parking:condition:{SIDE}=residents;ticket': {
    // Same as above
    newTags: ['parking:{SIDE}:fee=yes'],
    msg: 'If possible, also add `parking:{SIDE}:zone=*`.',
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
    newTags: ['parking:{SIDE}:restriction=loading_only'],
  },
  'parking:condition:{SIDE}=no_parking': {
    newTags: ['parking:{SIDE}:restriction=no_parking'],
  },
  'parking:condition:{SIDE}:conditional=no_parking @ ({*})': {
    newTags: ['parking:{SIDE}:restriction:conditional=no_parking @ ({*})'],
  },
  'parking:condition:{SIDE}=no_standing': {
    newTags: ['parking:{SIDE}:restriction=no_standing'],
  },
  'parking:condition:{SIDE}=no_stopping': {
    newTags: ['parking:{SIDE}:restriction=no_stopping'],
  },
  'parking:condition:{SIDE}=no': {
    newTags: ['parking:{SIDE}:restriction=none'],
    msg: 'Hint: Parking restriction unspecified.',
  },
  // TODO TAGGING: parking:condition:side:maxstay	...	parking:side:maxstay	...
  // TODO TAGGING: parking:condition:side:residents	...	parking:side:zone	...
  // TODO surface, lit
}
