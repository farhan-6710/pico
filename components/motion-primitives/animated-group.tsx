'use client';
import { motion, Variants } from 'framer-motion';
import React, { JSX, ReactNode } from 'react';

type AnimatedGroupProps = {
    children: ReactNode;
    className?: string;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
    as?: keyof JSX.IntrinsicElements;
    preset?: string;
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const defaultItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 0.8
        }
    },
};


export function AnimatedGroup({
    children,
    className,
    variants,
    as = 'div',
}: AnimatedGroupProps) {
    const Component = motion[as as keyof typeof motion] as any;

    const containerVariants = { ...defaultContainerVariants, ...variants?.container };
    const itemVariants = { ...defaultItemVariants, ...variants?.item };

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            {React.Children.map(children, (child) => {
                // We wrap each child in a motion component if it's not already one, 
                // effectively treating each direct child as an item.
                return (
                    <motion.div variants={itemVariants} className="contents">
                        {child}
                    </motion.div>
                );
            })}
        </Component>
    );
}
