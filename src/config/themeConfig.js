// Theme Configuration - Rustic Boho: Terracotta/Clay, Dusty Blue, Warm Cream, Peach Sand
export const themeConfig = {
    // Background Colors (warm cream primary, peach sand / pale blue for sections)
    backgrounds: {
        primary: 'bg-[#2F2F2F]',
        secondary: 'bg-[#E9C2A8]',
        accent: 'bg-[#7E95A6]',
        light: 'bg-[#F4EEE8]/50',
        theme: 'bg-[#F4EEE8]',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors (charcoal primary, muted for secondary)
    text: {
        primary: 'text-[#2F2F2F]',
        secondary: 'text-[#5a524a]',
        accent: 'text-[#7E95A6]',
        muted: 'text-[#E9C2A8]',
        dark: 'text-[#2F2F2F]',
        theme: 'text-[#C46A3A]',
        pause: 'text-[#F4EEE8]',
        custom: 'text-[#2F2F2F]',
    },

    // Border Colors
    borders: {
        primary: 'border-[#E9C2A8]',
        secondary: 'border-[#C46A3A]',
        accent: 'border-[#7E95A6]',
        theme: 'border-[#C46A3A]',
    },

    // Button Colors (Primary → Terracotta, Secondary → Dusty Blue)
    buttons: {
        primary: 'bg-[#C46A3A] hover:bg-[#a85830]',
        secondary: 'border border-[#C46A3A] hover:border-[#E9C2A8]',
        text: 'text-[#F4EEE8] hover:text-white',
        theme: 'bg-[#7E95A6] hover:bg-[#5F7484]',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-[#a85830]',
        secondary: 'hover:border-[#E9C2A8] hover:text-[#2F2F2F]',
        theme: 'hover:bg-[#5F7484]',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration (Rustic Boho) - section uses title color as background; titles/text in cream for contrast
    calendar: {
        weddingDate: '2026-05-17',
        highlightColor: 'bg-[#F4EEE8]',
        heartColor: 'text-[#7E95A6]',
        textColor: 'text-[#F4EEE8]',
        headerColor: 'text-[#F4EEE8]',
        dayNamesColor: 'text-[#F4EEE8]/90',
        background: 'bg-[#C46A3A]',
    },

    // Custom CSS Variables (Rustic Boho)
    cssVariables: {
        '--primary-bg': '#C46A3A',
        '--secondary-bg': '#E9C2A8',
        '--accent-bg': '#7E95A6',
        '--primary-text': '#2F2F2F',
        '--secondary-text': '#5a524a',
        '--accent-text': '#7E95A6',
        '--muted-text': '#E9C2A8',
        '--border-color': '#C46A3A',
        '--custom-theme': '#F4EEE8',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-wedding-600',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-wedding-600',
        }
    },
    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },
    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    }
}

export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
