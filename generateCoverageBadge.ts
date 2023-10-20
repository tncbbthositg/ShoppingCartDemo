import coverage from './coverage/coverage-summary.json' assert { type: 'json' };

import { makeBadge } from 'badge-maker';
import { writeFileSync } from 'fs';

const percentageCovered = coverage['total']['statements']['pct'];

let color = 'success';
if (percentageCovered < 80) { color = 'yellow'; }
else if (percentageCovered < 70) { color = 'critical'; }

const format = {
    label: 'coverage',
    message: `${percentageCovered}%`,
    color
};

const badge = makeBadge(format);

writeFileSync('coverage_badge.svg', badge, { flag: 'w' });
