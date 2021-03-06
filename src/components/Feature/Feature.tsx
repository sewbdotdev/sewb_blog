import React, { FunctionComponent } from 'react';
import styles from './Feature.module.css';
import Image from 'next/image';

const DataCyPrefix = 'FeatureComponent';

const Feature: FunctionComponent = (props) => {
    return (
        <section className={styles.container} data-cy={`${DataCyPrefix}Container`}>
            <Image
                src="/img/feature.jpeg"
                alt="Featured image saying software engineering without borders with some tags like design patterns."
                layout="fill"
                objectFit="cover"
                loading="eager"
                priority={true}
                data-cy={`${DataCyPrefix}Image`}
            />
            {props.children}
        </section>
    );
};

export default Feature;
