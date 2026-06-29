'use client';

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface AreaChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  color?: string;
}

export const AreaChart = ({ data, title, color = '#0070f3' }: AreaChartProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid #e2e8f0',
        p: 3,
        height: 400,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#0f172a',
          fontWeight: 600,
          fontSize: '16px',
          mb: 3,
        }}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="85%">
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
