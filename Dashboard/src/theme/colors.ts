const commonColors = {
  primary: '#FACC15',    
  secondary: '#FB923C',  
  error: '#EF4444',
  success: '#22C55E',
};

export const Themes ={
    dark: {
        ...commonColors,
        background: '#0F172A',
        surface: '#1E293B',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
    },
    light: {
        ...commonColors,
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#0F172A',
        textMuted: '#64748B',
    },
};
