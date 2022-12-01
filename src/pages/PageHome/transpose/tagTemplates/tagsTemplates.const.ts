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
  'parking:lane:{SIDE}:capacity:disabled': {
    compare: 'key',
    newTags: ['parking:{SIDE}:capacity:disabled'],
  },
  'parking:lane:{SIDE}:surface': {
    compare: 'key',
    newTags: ['parking:{SIDE}:surface'],
  },
  'parking:lane:{SIDE}:width': {
    compare: 'key',
    newTags: ['parking:{SIDE}:width'],
  },
  'parking:lane:{SIDE}:lit': {
    compare: 'key',
    newTags: ['parking:{SIDE}:lit'],
  },
  'parking:condition:{SIDE}=free': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=no'],
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
  'parking:condition:{SIDE}:conditional=free @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:fee:conditional=no @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=no_parking @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:restriction:conditional=no_parking @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=ticket @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:fee:conditional=yes @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=disc @ {ANYTHING}': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:authentication:disc:conditional=yes @ {ANYTHING}',
    ],
  },
  'parking:condition:{SIDE}:conditional=residents @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:access:conditional=private @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=ticket;residents @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:fee:conditional=yes @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=residents;ticket @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:fee:conditional=yes @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=customers @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:access:conditional=customers @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=private @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:access:conditional=private @ {ANYTHING}'],
  },
  'parking:condition:{SIDE}:conditional=disabled @ {ANYTHING}': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:access:conditional=no @ {ANYTHING}',
      'parking:{SIDE}:disabled:conditional=designated @ {ANYTHING}',
    ],
  },
  'parking:condition:{SIDE}:conditional=loading @ {ANYTHING}': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:restriction:conditional=loading_only @ {ANYTHING}',
    ],
  },
  'parking:condition:{SIDE}:conditional=no_standing @ {ANYTHING}': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:restriction:conditional=no_standing @ {ANYTHING}',
    ],
  },
  'parking:condition:{SIDE}:conditional=no_stopping @ {ANYTHING}': {
    compare: 'regex',
    newTags: [
      'parking:{SIDE}:restriction:conditional=no_stopping @ {ANYTHING}',
    ],
  },
  'parking:condition:{SIDE}:conditional=no @ {ANYTHING}': {
    compare: 'regex',
    newTags: ['parking:{SIDE}:restriction:conditional=none @ {ANYTHING}'],
  },
  'parking:lane:{SIDE}:maxstay': {
    compare: 'key',
    newTags: ['parking:{SIDE}:maxstay'],
  },
  'parking:lane:{SIDE}:maxstay:conditional': {
    compare: 'key',
    newTags: ['parking:{SIDE}:maxstay:conditional'],
    msg: 'This tag has a complex value; please check it manually. It might be, that because of the value tag has to be updated differently. (Ususually this script handles key and values, but in this case only the key was analysed)',
  },
  'parking:condition:{SIDE}:residents': {
    compare: 'key',
    newTags: ['parking:{SIDE}:zone'],
    msg: 'Please double check this tag. The transponation from old to new schema was done by looking at the key only.',
  },
  'parking:condition:either_side_only=yes': {
    compare: 'tag',
    newTags: ['parking:both:staggered=yes'],
  },
  'parking:condition:either_side_only=no': {
    compare: 'tag',
    newTags: ['parking:both:staggered=no'],
  },
  'parking:lane:{SIDE}:condition=free': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=no'],
  },
  'parking:lane:{SIDE}:condition=ticket': {
    compare: 'tag',
    newTags: ['parking:{SIDE}:fee=yes'],
  },
  'parking:lane=parallel': {
    compare: 'tag',
    newTags: ['parking:both:orientation=parallel'],
  },
  'parking:lane=diagonal': {
    compare: 'tag',
    newTags: ['parking:both:orientation=diagonal'],
  },
  'parking:lane=perpendicular': {
    compare: 'tag',
    newTags: ['parking:both:orientation=perpendicular'],
  },
  'parking:lane=left': {
    compare: 'tag',
    newTags: ['parking:left=yes', 'parking:right=no'],
    msg: 'Please double check if this is right. The input tagging is uncommon.',
  },
  'parking:lane=right': {
    compare: 'tag',
    newTags: ['parking:right=yes', 'parking:left=no'],
    msg: 'Please double check if this is right. The input tagging is uncommon.',
  },
  'parking:lane=both': {
    compare: 'tag',
    newTags: ['parking:both=yes'],
  },
  'parking:lane=yes': {
    compare: 'tag',
    newTags: ['parking:both=yes'],
    msg: 'Please double check if this is right. The input tagging is uncommon.',
  },
  'parking:lane=no': {
    compare: 'tag',
    newTags: ['parking:both=no'],
  },
  'parking:lane=none': {
    compare: 'tag',
    newTags: ['parking:both=no'],
  },
  'parking:lane=no_parking': {
    compare: 'tag',
    newTags: ['parking:both=no', 'parking:both:restriction=no_parking'],
  },
  'parking:lane=no_stopping': {
    compare: 'tag',
    newTags: ['parking:both=no', 'parking:both:restriction=no_stopping'],
  },
  'parking:lane=on_street': {
    compare: 'tag',
    newTags: ['parking:both=lane'],
  },
  'parking:lane=half_on_kerb': {
    compare: 'tag',
    newTags: ['parking:both=half_on_kerb'],
  },
  'parking:lane=on_kerb': {
    compare: 'tag',
    newTags: ['parking:both=on_kerb'],
  },
  'parking:lane=street_side': {
    compare: 'tag',
    newTags: ['parking:both=street_side'],
  },
  'parking:lane=marked': {
    compare: 'tag',
    newTags: ['parking:both=yes', 'parking:both:markings=yes'],
  },
  'parking:lane=separate': {
    compare: 'tag',
    newTags: ['parking:both=separate'],
  },
  'parking:fee=yes': {
    compare: 'tag',
    newTags: ['parking:both:fee=yes'],
  },
  'parking:fee=no': {
    compare: 'tag',
    newTags: ['parking:both:fee=no'],
  },
  // TODO TAGGING: parking:condition:side:maxstay	...	parking:side:maxstay	...
  // TODO TAGGING: parking:condition:side:residents	...	parking:side:zone	...
  // TODO surface, lit
}
