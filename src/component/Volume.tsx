import { useContext } from 'react';

import SystemStatusContext from './SystemStatusContext';

const OUNCES_PER_PINT = 16.0;

/** Like `Number.toFixed`, but chops off any insignificant zero suffix. */
const toFixedChopZeroes = (v, places = 1) => {
  return v.toFixed(places).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');
};

const mlToOz = (ml) => ml * 0.033814;
const mlToL = (ml) => ml / 1000;
const ozToPints = (oz) => oz / 16.0;

const humanizeMl = (ml) => {
  if (ml >= 1000) {
    return `${toFixedChopZeroes(mlToL(ml))} L`;
  }
  return `${Math.round(ml)} mL`;
};

const humanizeOz = (oz) => {
  if (oz >= OUNCES_PER_PINT) {
    const plural = ozToPints(oz) >= 2 ? 's' : '';
    return `${toFixedChopZeroes(ozToPints(oz))} pint${plural}`;
  }
  return `${toFixedChopZeroes(oz)} oz`;
};

export default function Volume({ ml = 0 }) {
  const { site } = useContext(SystemStatusContext);
  const isMetric = site.volume_display_units !== 'imperial';
  if (isMetric) {
    return <>{humanizeMl(ml)}</>;
  } else {
    return <>{humanizeOz(mlToOz(ml))}</>;
  }
}
