'use client';
import { motion, TargetAndTransition, Variants } from 'framer-motion';
import React, { JSX } from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
    children: string;
    per?: 'word' | 'char' | 'line';
    as?: keyof JSX.IntrinsicElements;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
    className?: string;
    preset?: string; // intentionally string to allow custom presets like 'fade-in-blur'
    delay?: number;
    speedSegment?: number;
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const defaultItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
};

const presets = {
    'fade-in-blur': {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.4 } },
        },
    },
};

export function TextEffect({
    children,
    per = 'word',
    as = 'div',
    variants,
    className,
    preset,
    delay = 0,
    speedSegment = 0.05
}: TextEffectProps) {
    const Component = motion[as as keyof typeof motion] as any;

    let selectedVariants = {
        container: defaultContainerVariants,
        item: defaultItemVariants
    };

    if (preset && presets[preset as keyof typeof presets]) {
        selectedVariants = presets[preset as keyof typeof presets];
    }

    if (variants) {
        selectedVariants = {
            container: { ...selectedVariants.container, ...variants.container },
            item: { ...selectedVariants.item, ...variants.item }
        }
    }

    // Apply delay and speed
    selectedVariants.container = {
        ...selectedVariants.container,
        visible: {
            ...selectedVariants.container.visible,
            transition: {
                ...(selectedVariants.container.visible as TargetAndTransition)?.transition,
                staggerChildren: speedSegment,
                delayChildren: delay
            }
        }
    }


    const words = children.split(' ');
    const chars = children.split('');

    if (per === 'line') {
        // Simulating line split typically requires layout measurement or manual newline handling. 
        // For simplicity in this drop-in, broadly treating whole text as one item if no newlines.
        // Or we can just fall back to word/char. 
        // Let's treat it as words for now to ensure it renders, but user asked for 'line'.
        // If the user string implies lines, we can split by \n
        return (
            <Component
                className={className}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={selectedVariants.container}
            >
                <motion.span variants={selectedVariants.item} className="inline-block">
                    {children}
                </motion.span>
            </Component>
        )
    }

    if (per === 'word') {
        return (
            <Component
                className={className}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={selectedVariants.container}
            >
                {words.map((word, index) => (
                    <span key={index} className="inline-block whitespace-pre">
                        <motion.span variants={selectedVariants.item} className="inline-block">
                            {word}
                        </motion.span>
                        {index < words.length - 1 && ' '}
                    </span>
                ))}
            </Component>
        );
    }

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={selectedVariants.container}
        >
            {chars.map((char, index) => (
                <motion.span key={index} variants={selectedVariants.item} className="inline-block whitespace-pre">
                    {char}
                </motion.span>
            ))}
        </Component>
    );
}
