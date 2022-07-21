import { useContext } from 'react';

import SystemStatusContext from './SystemStatusContext';

const mlToOz = (ml) => (ml * 0.033814).toFixed(1);

export default function Volume({ ml = 0 }) {
  const { site } = useContext(SystemStatusContext);
  const isMetric = site.volume_display_units !== 'imperial';
  let convertedVolume;
  if (isMetric) {
    convertedVolume = `${Math.round(ml)} mL`;
  } else {
    convertedVolume = `${mlToOz(ml)} oz`;
  }
  return <>{convertedVolume}</>;
}
