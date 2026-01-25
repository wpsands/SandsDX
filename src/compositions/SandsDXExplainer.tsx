import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// SandsDX Brand Colors
const COLORS = {
  primary: "#2563EB", // Blue
  secondary: "#7C3AED", // Purple
  accent: "#06B6D4", // Cyan
  dark: "#0F172A", // Dark blue
  light: "#F8FAFC", // Light
  gradient: "linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)",
};

// ============================================
// SCENE 1: INTRO WITH LOGO ANIMATION
// ============================================
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const particleCount = 20;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const delay = i * 2;
    const distance = interpolate(frame - delay, [0, 60], [0, 300], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame - delay, [0, 30, 60], [0, 0.6, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity,
      size: 4 + (i % 3) * 2,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: i % 2 === 0 ? COLORS.primary : COLORS.accent,
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: COLORS.gradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px",
          }}
        >
          SandsDX
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: COLORS.light,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Digital Experience Platform
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: PROBLEM STATEMENT
// ============================================
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const problems = [
    "Disconnected tools",
    "Complex workflows",
    "Scattered data",
    "Slow processes",
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.primary}15 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}15 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div style={{ opacity: titleOpacity, textAlign: "center" }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.light,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: 60,
          }}
        >
          Digital challenges are{" "}
          <span style={{ color: COLORS.accent }}>everywhere</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 30,
            marginTop: 40,
          }}
        >
          {problems.map((problem, i) => {
            const delay = i * 15;
            const opacity = interpolate(frame - delay, [20, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const scale = spring({
              frame: frame - delay - 20,
              fps,
              config: { damping: 12 },
            });

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `scale(${Math.min(scale, 1)})`,
                  background: "rgba(255,255,255,0.05)",
                  border: `2px solid ${COLORS.primary}50`,
                  borderRadius: 20,
                  padding: "30px 40px",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    color: COLORS.light,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {problem}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: SOLUTION REVEAL
// ============================================
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revealProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
          opacity: glowPulse * revealProgress,
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            fontSize: 38,
            color: COLORS.accent,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
            marginBottom: 30,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
            textTransform: "uppercase",
            letterSpacing: "6px",
          }}
        >
          Introducing
        </div>

        <div
          style={{
            fontSize: 140,
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: COLORS.gradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `scale(${revealProgress})`,
            letterSpacing: "-3px",
          }}
        >
          SandsDX
        </div>

        <div
          style={{
            fontSize: 32,
            color: COLORS.light,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            marginTop: 40,
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateRight: "clamp",
            }),
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Your unified platform for seamless digital experiences
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: FEATURES SHOWCASE
// ============================================
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance" },
    { icon: "🔗", title: "Integrated", desc: "All tools connected" },
    { icon: "🎯", title: "Focused", desc: "Goal-driven design" },
    { icon: "🛡️", title: "Secure", desc: "Enterprise-grade security" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.light,
          fontFamily: "system-ui, -apple-system, sans-serif",
          marginBottom: 60,
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Powerful <span style={{ color: COLORS.primary }}>Features</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {features.map((feature, i) => {
          const delay = i * 20;
          const slideIn = interpolate(
            frame - delay,
            [10, 40],
            [100, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const opacity = interpolate(frame - delay, [10, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${slideIn}px)`,
                background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`,
                border: `1px solid ${COLORS.primary}40`,
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>{feature.icon}</div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: COLORS.light,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: 10,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: `${COLORS.light}99`,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: HOW IT WORKS
// ============================================
const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { num: "01", title: "Connect", desc: "Link your tools" },
    { num: "02", title: "Configure", desc: "Set your workflow" },
    { num: "03", title: "Launch", desc: "Go live instantly" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.light,
          fontFamily: "system-ui, -apple-system, sans-serif",
          marginBottom: 80,
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        How It <span style={{ color: COLORS.accent }}>Works</span>
      </div>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {steps.map((step, i) => {
          const delay = i * 30;
          const progress = interpolate(frame - delay, [20, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: progress,
                  transform: `scale(${progress})`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: COLORS.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    margin: "0 auto 24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: COLORS.light,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.light,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: `${COLORS.light}80`,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {step.desc}
                </div>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: COLORS.gradient,
                    opacity: interpolate(
                      frame - delay,
                      [40, 60],
                      [0, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    ),
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: TESTIMONIAL/STATS
// ============================================
const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const stats = [
    { value: "10x", label: "Faster Workflows" },
    { value: "99.9%", label: "Uptime" },
    { value: "500+", label: "Integrations" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.light,
          fontFamily: "system-ui, -apple-system, sans-serif",
          marginBottom: 80,
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Trusted by Industry Leaders
      </div>

      <div style={{ display: "flex", gap: 80 }}>
        {stats.map((stat, i) => {
          const delay = i * 20;
          const countUp = interpolate(frame - delay, [20, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: interpolate(frame - delay, [10, 30], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: COLORS.light,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  transform: `scale(${0.5 + countUp * 0.5})`,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: `${COLORS.light}CC`,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginTop: 10,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 7: CALL TO ACTION
// ============================================
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = 1 + Math.sin(frame * 0.15) * 0.05;

  const buttonSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background rings */}
      {[1, 2, 3].map((ring) => {
        const ringProgress = ((frame + ring * 30) % 120) / 120;
        return (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: 200 + ringProgress * 800,
              height: 200 + ringProgress * 800,
              borderRadius: "50%",
              border: `2px solid ${COLORS.primary}`,
              opacity: 1 - ringProgress,
            }}
          />
        );
      })}

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.light,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: 30,
            opacity: interpolate(frame, [0, 30], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Ready to Transform?
        </div>

        <div
          style={{
            fontSize: 28,
            color: `${COLORS.light}99`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: 60,
            opacity: interpolate(frame, [20, 50], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Start your digital journey today
        </div>

        <div
          style={{
            transform: `scale(${buttonSpring * pulseScale})`,
            display: "inline-block",
          }}
        >
          <div
            style={{
              background: COLORS.gradient,
              padding: "24px 60px",
              borderRadius: 50,
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.light,
              fontFamily: "system-ui, -apple-system, sans-serif",
              boxShadow: `0 10px 40px ${COLORS.primary}50`,
            }}
          >
            Get Started Free
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 18,
            color: `${COLORS.light}60`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          No credit card required
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 8: OUTRO WITH LOGO
// ============================================
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle gradient orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}30 0%, transparent 70%)`,
          top: -100,
          right: -100,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondary}30 0%, transparent 70%)`,
          bottom: -50,
          left: -50,
        }}
      />

      <div
        style={{
          transform: `scale(${logoScale})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: COLORS.gradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px",
          }}
        >
          SandsDX
        </div>

        <div
          style={{
            fontSize: 24,
            color: `${COLORS.light}80`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginTop: 20,
            letterSpacing: "3px",
            textTransform: "uppercase",
            opacity: interpolate(frame, [30, 50], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          sandsdx.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const SandsDXExplainer: React.FC = () => {
  // 1800 frames total at 30fps = 60 seconds
  // Scene breakdown:
  // - Intro: 0-210 (7 sec)
  // - Problem: 210-420 (7 sec)
  // - Solution: 420-630 (7 sec)
  // - Features: 630-870 (8 sec)
  // - How It Works: 870-1110 (8 sec)
  // - Stats: 1110-1350 (8 sec)
  // - CTA: 1350-1590 (8 sec)
  // - Outro: 1590-1800 (7 sec)

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={210}>
        <IntroScene />
      </Sequence>

      <Sequence from={210} durationInFrames={210}>
        <ProblemScene />
      </Sequence>

      <Sequence from={420} durationInFrames={210}>
        <SolutionScene />
      </Sequence>

      <Sequence from={630} durationInFrames={240}>
        <FeaturesScene />
      </Sequence>

      <Sequence from={870} durationInFrames={240}>
        <HowItWorksScene />
      </Sequence>

      <Sequence from={1110} durationInFrames={240}>
        <StatsScene />
      </Sequence>

      <Sequence from={1350} durationInFrames={240}>
        <CTAScene />
      </Sequence>

      <Sequence from={1590} durationInFrames={210}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
