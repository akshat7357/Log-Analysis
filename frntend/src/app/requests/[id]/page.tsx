'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import { AppLayout } from '@/components/Layout/AppLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for the dashboard
const SWARM_AGENTS = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    description: 'Session Manager & Planner',
    status: 'COMPLETED',
    icon: '🎯',
    color: '#10b981',
  },
  {
    id: 'log-analyst',
    name: 'Log Analyst',
    description: 'Log Parsing & Context Structuring',
    status: 'COMPLETED',
    icon: '📊',
    color: '#10b981',
  },
  {
    id: 'env-manager',
    name: 'Environment Manager',
    description: 'Context Setup & Backend Tester',
    status: 'COMPLETED',
    icon: '⚙️',
    color: '#10b981',
  },
  {
    id: 'code-writer',
    name: 'Code-Writing Agent',
    description: 'Patch Writer & Automation',
    status: 'COMPLETED',
    icon: '💻',
    color: '#10b981',
  },
  {
    id: 'ai-reviewer',
    name: 'AI Review Agent',
    description: 'Peer Audit & Guardrails Manager',
    status: 'COMPLETED',
    icon: '🔍',
    color: '#10b981',
  },
  {
    id: 'gitops',
    name: 'Git Ops Agent',
    description: 'Pull Request/Repository Executor',
    status: 'COMPLETED',
    icon: '🔧',
    color: '#10b981',
  },
];

const WORKFLOW_STEPS = [
  { id: 1, name: 'TRIAGE', status: 'completed' },
  { id: 2, name: 'ENVIRONMENT', status: 'completed' },
  { id: 3, name: 'CODER', status: 'completed' },
  { id: 4, name: 'REVIEWER', status: 'completed' },
  { id: 5, name: 'GIT OPS', status: 'completed' },
  { id: 6, name: 'HEALING / DONE', status: 'completed' },
];

const INCIDENT_QUEUE = [
  {
    id: 'EPIC-309',
    title: 'user-profile',
    module: 'CascadingResolveError',
    priority: 'P1 (URGENT)',
    status: 'IN_PROGRESS',
  },
];

const EXECUTION_LOGS = [
  { level: 'info', message: 'Request received', timestamp: '10:30:45.123', agent: 'Orchestrator' },
  { level: 'info', message: 'Authenticating user', timestamp: '10:30:45.145', agent: 'Orchestrator' },
  { level: 'info', message: 'User authenticated successfully', timestamp: '10:30:45.167', agent: 'Orchestrator' },
  { level: 'info', message: 'Parsing Stack Trace...', timestamp: '10:30:45.189', agent: 'Log Analyst' },
  { level: 'info', message: 'Resolving Context...', timestamp: '10:30:45.234', agent: 'Environment Manager' },
  { level: 'info', message: 'Initializing Swarm Triage', timestamp: '10:30:45.256', agent: 'Orchestrator' },
];

const ORIGINAL_CODE = `public PaymentResult charge(Order order) {
  PaymentIntent intent = stripeService.retrieveIntent(order.getStripeId());
  // CRASH: If stripe retrieve fails, intent is null
  String status = intent.getStatus();
  if ("succeeded".equals(status)) {
    return PaymentResult.success(order.getId());
  }
  return PaymentResult.failed(order.getId(), "Unable to retrieve payment status from Stripe.");
}`;

const FIXED_CODE = `public PaymentResult charge(Order order) {
  try {
    PaymentIntent intent = stripeService.retrieveIntent(order.getStripeId());
    if (intent == null) {
      log.error("Stripe retrieved PaymentIntent is null for Order ID: " + order.getId());
      return PaymentResult.failed(order.getId(), "Unable to retrieve payment status from Stripe.");
    }
    String status = intent.getStatus();
    if (status == null || "succeeded".equals(status)) {
      return PaymentResult.success(order.getId());
    }
  }
  return PaymentResult.failed(order.getId(), "Payment status: " + status);
}`;

const RAW_ERROR_LOG = `[2026-06-29 10:30:45.001] INFO  [http-nio-8080-exec-1] c.f.payment.PaymentController - Processing payment for order ORDER-12345
[2026-06-29 10:30:45.145] DEBUG [http-nio-8080-exec-1] c.f.payment.StripeService - Calling Stripe API for payment intent pi_3NZxYZ...
[2026-06-29 10:30:45.567] ERROR [http-nio-8080-exec-1] c.f.payment.StripeService - Stripe API call failed: Connection timeout
[2026-06-29 10:30:45.568] ERROR [http-nio-8080-exec-1] c.f.payment.PaymentController - NullPointerException in payment processing
java.lang.NullPointerException: Cannot invoke "com.stripe.model.PaymentIntent.getStatus()" because "intent" is null
    at com.formedics.payment.PaymentService.charge(PaymentService.java:45)
    at com.formedics.payment.PaymentController.processPayment(PaymentController.java:78)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
[2026-06-29 10:30:45.670] ERROR [http-nio-8080-exec-1] c.f.payment.PaymentController - Failed to process order payment`;

export default function RequestDetailPage() {
  useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client side only
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppLayout>
      <Box sx={{ height: 'calc(100vh - 80px)', overflow: 'hidden', bgcolor: '#f8fafc' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid #e2e8f0',
            bgcolor: 'white',
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => router.back()}
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                '&:hover': { bgcolor: '#f8fafc', borderColor: '#0070f3' },
              }}
            >
              <ArrowBackIcon sx={{ color: '#64748b' }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#10b981',
                  boxShadow: '0 0 6px rgba(16, 185, 129, 0.2)',
                }}
              />
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '0.5px',
                }}
              >
                Autonomous Logs Monitor Agent
              </Typography>
              <Chip
                label="v4.7 STABLE"
                size="small"
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#10b981',
                  boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)',
                }}
              />
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                GCP Logs Pub/Sub: LISTENING
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#0070f3',
                  boxShadow: '0 0 6px rgba(0, 112, 243, 0.4)',
                }}
              />
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                Bitbucket API: CONNECTED
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#10b981',
                  boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)',
                }}
              />
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                JIRA Webhook: SYNCED
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 0.75,
                bgcolor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 1,
              }}
            >
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                {currentTime ? currentTime.toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }) : '--/--/----, --:--:--'} UTC
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 3-Column Layout */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '320px 1fr 380px', gap: 2, height: 'calc(100% - 100px)' }}>
          {/* LEFT PANEL - Active Swarm Members */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pb: 1,
                  borderBottom: '2px solid #e2e8f0',
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#10b981',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Active Swarm Members
                </Typography>
                <Typography
                  sx={{
                    fontSize: '11px',
                    color: '#10b981',
                    fontWeight: 700,
                    ml: 'auto',
                  }}
                >
                  6 / 6
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {SWARM_AGENTS.map((agent) => (
                    <Paper
                      key={agent.id}
                      sx={{
                        bgcolor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: 1.5,
                        p: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: 'none',
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          borderColor: '#0070f3',
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            bgcolor: 'rgba(0, 112, 243, 0.08)',
                            border: '1px solid rgba(0, 112, 243, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                          }}
                        >
                          {agent.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', mb: 0.25 }}>
                            {agent.name}
                          </Typography>
                          <Typography sx={{ fontSize: '10px', color: '#64748b', lineHeight: 1.3 }}>
                            {agent.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label="COMPLETED"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          fontSize: '9px',
                          fontWeight: 700,
                          height: '20px',
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </Box>

              {/* Metrics */}
              <Paper
                sx={{
                  bgcolor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1.5,
                  p: 2,
                  boxShadow: 'none',
                }}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#10b981', mb: 0.5 }}>
                      42
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>
                      Errors Resolved
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0070f3', mb: 0.5 }}>
                      18m
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>
                      MTTR Reduction
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#10b981', mb: 0.5 }}>
                      98.4%
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>
                      Remediation Rate
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

          {/* CENTER PANEL - Active Investigation */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
            {/* Investigation Header */}
            <Paper
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 1.5,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label="RESOLVED"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                />
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                  payment-gateway
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
                  (Line 45)
                </Typography>
                <Chip
                  label="FATAL"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    fontSize: '10px',
                    fontWeight: 700,
                    ml: 'auto',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontFamily: 'monospace',
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                Error: NullPointerException - Cannot invoke "com.stripe.model.PaymentIntent.getStatus()" because "intent" is null
              </Typography>

              {/* Workflow Timeline */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    mb: 1.5,
                  }}
                >
                  Swarm Decision Trace & Execution Logs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {WORKFLOW_STEPS.map((step, idx) => (
                    <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: step.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                            border: `2px solid ${step.status === 'completed' ? '#10b981' : '#6b7280'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.5,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              fontSize: '16px',
                              color: step.status === 'completed' ? '#10b981' : '#6b7280',
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '8px',
                            fontWeight: 700,
                            color: step.status === 'completed' ? '#10b981' : '#6b7280',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                          }}
                        >
                          {step.name}
                        </Typography>
                      </Box>
                      {idx < WORKFLOW_STEPS.length - 1 && (
                        <Box
                          sx={{
                            height: 2,
                            flex: 0.3,
                            bgcolor: step.status === 'completed' ? '#10b981' : '#6b7280',
                            mt: -2,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Execution Logs Preview */}
              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  p: 1.5,
                  maxHeight: '120px',
                  overflow: 'auto',
                }}
              >
                {EXECUTION_LOGS.slice(0, 4).map((log, idx) => (
                  <Typography
                    key={idx}
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      color: '#64748b',
                      mb: 0.5,
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#64748b' }}>{log.timestamp}</span>{' '}
                    <span style={{ color: '#10b981', fontWeight: 700 }}>[{log.agent}]</span>{' '}
                    <span style={{ color: '#0f172a' }}>{log.message}</span>
                  </Typography>
                ))}
              </Box>
            </Paper>

            {/* Code Diff / Error Log Tabs */}
            <Paper
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 1.5,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  pt: 1.5,
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                <Box
                  onClick={() => setActiveTab(0)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom: activeTab === 0 ? '2px solid #0070f3' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: activeTab === 0 ? '#0070f3' : '#6b7280',
                      textTransform: 'uppercase',
                    }}
                  >
                    Code Patch Diff
                  </Typography>
                </Box>
                <Box
                  onClick={() => setActiveTab(1)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom: activeTab === 1 ? '2px solid #0070f3' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: activeTab === 1 ? '#0070f3' : '#6b7280',
                      textTransform: 'uppercase',
                    }}
                  >
                    Raw Event Log
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 0 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
                    {/* Original Code */}
                    <Box sx={{ borderRight: '1px solid #e2e8f0' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 2,
                          py: 1.5,
                          bgcolor: '#f8fafc',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 0.75 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          StripePaymentGateway.java - Unified Git Diff
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 2,
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          bgcolor: 'rgba(239, 68, 68, 0.05)',
                          height: 'calc(100% - 46px)',
                          overflow: 'auto',
                        }}
                      >
                        {ORIGINAL_CODE.split('\n').map((line, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 0.3 }}>
                            <Typography
                              sx={{
                                color: '#4b5563',
                                minWidth: '40px',
                                textAlign: 'right',
                                userSelect: 'none',
                              }}
                            >
                              {idx + 1}
                            </Typography>
                            <Typography
                              sx={{
                                color: line.includes('CRASH') ? '#ef4444' : '#fca5a5',
                                whiteSpace: 'pre',
                              }}
                            >
                              {line.includes('CRASH') ? '- ' : '  '}
                              {line}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Fixed Code */}
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 2,
                          py: 1.5,
                          bgcolor: '#f8fafc',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 0.75 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          FIXED CODE
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 2,
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          bgcolor: 'rgba(16, 185, 129, 0.05)',
                          height: 'calc(100% - 46px)',
                          overflow: 'auto',
                        }}
                      >
                        {FIXED_CODE.split('\n').map((line, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 0.3 }}>
                            <Typography
                              sx={{
                                color: '#4b5563',
                                minWidth: '40px',
                                textAlign: 'right',
                                userSelect: 'none',
                              }}
                            >
                              {idx + 1}
                            </Typography>
                            <Typography
                              sx={{
                                color: line.includes('try') || line.includes('log.error') || line.includes('null')
                                  ? '#10b981'
                                  : '#86efac',
                                whiteSpace: 'pre',
                              }}
                            >
                              {line.includes('try') || line.includes('log.error') || line.includes('null') ? '+ ' : '  '}
                              {line}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.5,
                        bgcolor: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          color: '#64748b',
                          fontWeight: 500,
                        }}
                      >
                        Raw Error Log
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        bgcolor: '#f8fafc',
                        height: 'calc(100% - 46px)',
                        overflow: 'auto',
                      }}
                    >
                      {RAW_ERROR_LOG.split('\n').map((line, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            color: line.includes('ERROR')
                              ? '#f87171'
                              : line.includes('DEBUG')
                              ? '#60a5fa'
                              : '#86efac',
                            mb: 0.3,
                            whiteSpace: 'pre',
                          }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>

          {/* RIGHT PANEL - Incident Queue & Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'auto', height: '100%' }}>
              {/* Live Incident Queue */}
            <Paper
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 1.5,
                p: 2,
                boxShadow: 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#0070f3',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Live Incident Queue
                </Typography>
                <Chip
                  label="1 ACTIVE"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 112, 243, 0.1)',
                    color: '#0070f3',
                    fontSize: '9px',
                    fontWeight: 700,
                    height: '18px',
                    ml: 'auto',
                  }}
                />
              </Box>

              {INCIDENT_QUEUE.map((incident) => (
                <Box
                  key={incident.id}
                  sx={{
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 1,
                    p: 1.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#0070f3',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#0070f3' }}>
                      {incident.id}
                    </Typography>
                    <Chip
                      label="P1 (URGENT)"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        fontSize: '8px',
                        fontWeight: 700,
                        height: '16px',
                        ml: 'auto',
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', mb: 0.5 }}>
                    {incident.title}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: '#64748b' }}>
                    {incident.module}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* JIRA Ticket */}
            <Paper
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 1.5,
                p: 2,
                boxShadow: 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 0.5,
                    bgcolor: '#0070f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: 'white',
                  }}
                >
                  J
                </Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Linked Jira Incident Ticket
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', mb: 1 }}>
                  Fatal NullPointerException in StripePaymentGateway line 142
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#64748b', mb: 2, lineHeight: 1.5 }}>
                  Production crash reported in prod. Automated unit tests have passed. Merging and closing.
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label="CRITICAL"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      fontSize: '9px',
                      fontWeight: 700,
                      height: '20px',
                    }}
                  />
                  <Chip
                    label="AI Orchestrator Swarm"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      color: '#0070f3',
                      fontSize: '9px',
                      fontWeight: 700,
                      height: '20px',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography sx={{ fontSize: '10px', color: '#64748b' }}>RELATED ENTITIES</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '10px', bgcolor: '#0070f3' }}>
                    AS
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>
                      Error Analyzer
                    </Typography>
                    <Typography sx={{ fontSize: '9px', color: '#64748b' }}>
                      ASSIGNEE
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Status Timeline */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    mb: 1.5,
                  }}
                >
                  Jira Ticket Status
                </Typography>
                <Box
                  sx={{
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 1,
                    p: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {[
                      { status: 'OPEN', time: '11:45', done: true },
                      { status: 'IN PROGRESS', time: '11:47', done: true },
                      { status: 'UNDER REVIEW', time: '11:52', done: true },
                      { status: 'RESOLVED', time: '12:03', done: true },
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CheckCircleIcon
                          sx={{
                            fontSize: '16px',
                            color: item.done ? '#10b981' : '#cbd5e1',
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '11px',
                            color: item.done ? '#0f172a' : '#94a3b8',
                            fontWeight: item.done ? 600 : 500,
                            flex: 1,
                          }}
                        >
                          {item.status}
                        </Typography>
                        <Typography sx={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                          {item.time}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Activity Feed */}
              <Box>
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    mb: 1.5,
                  }}
                >
                  Activity Feed / Discussion
                </Typography>
                <Box
                  sx={{
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 1,
                    p: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      color: '#0070f3',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    Swarm Update 05
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
                    "Verified AI-created fix prod. Automated unit tests have passed. Merging and closing."
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Bitbucket PR */}
            <Paper
              sx={{
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 1.5,
                p: 2,
                boxShadow: 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 0.5,
                    bgcolor: '#0070f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: 'white',
                  }}
                >
                  B
                </Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Bitbucket Pull Request
                </Typography>
                <Chip
                  label="PR #184"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 112, 243, 0.1)',
                    color: '#0070f3',
                    fontSize: '9px',
                    fontWeight: 700,
                    height: '18px',
                    ml: 'auto',
                  }}
                />
              </Box>

              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  p: 1.5,
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', mb: 1 }}>
                  fix(payment-gateway): Guard against null Stripe intent object
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#64748b', mb: 1.5 }}>
                  Adds null validation and error logging. Stripe API timeouts were causing crashes.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '9px', color: '#64748b', mb: 0.5 }}>
                      SOURCE BRANCH
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        color: '#60a5fa',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                      }}
                    >
                      fix/payment-gateway-nullpointer-a1f0c13
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '9px', color: '#64748b', mb: 0.5 }}>
                      TARGET BRANCH
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        color: '#86efac',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                      }}
                    >
                      master
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: '9px', color: '#64748b', mb: 0.5 }}>
                      PR ISSUE
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        color: '#0f172a',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                      }}
                    >
                      MERGED
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  p: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: '14px', color: '#10b981' }} />
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>
                    BITBUCKET PIPELINE TEST STATUS
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '10px', color: '#64748b' }}>
                  All automated QA, integration, and security checks have successfully passed. Ready for deployment automation.
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 1.5,
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 1,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: '16px', color: '#10b981' }} />
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>
                  PULL REQUEST MERGED SUCCESSFULLY
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#64748b',
                  mt: 1,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                (4 view future on Bitbucket Cloud)
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}
