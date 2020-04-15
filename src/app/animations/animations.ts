import {
    trigger,
    animate,
    transition,
    style,
    state,
    query,
  } from '@angular/animations';
  
  export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        style({ opacity: 0 }),
        animate('0.4s', style({ opacity: 1 }))
    ])
  ]);

export const inOutAnimation = trigger(
  'inOutAnimation', 
  [
    transition(
      ':enter', 
      [
        style({ height: 0, opacity: 0 }),
        animate('0.3s ease-out', style({ height: '*', opacity: 1 }))
      ]
    ),
    transition(
      ':leave', 
      [
        style({ height: '*', opacity: 1 }),
        animate('0.3s ease-in', style({ height: 0, opacity: 0 }))
      ]
    )
  ]
)



