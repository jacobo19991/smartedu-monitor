import type { RiskLevel } from '../../types';
import { getRiskIcon, getRiskBadgeStyles } from '../../utils/risk';

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRiskBadgeStyles(risk)}`}>
      {getRiskIcon(risk)}
      {risk}
    </span>
  );
}
