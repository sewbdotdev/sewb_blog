import React, { FunctionComponent } from 'react';

type ContentProps = {
    classNames?: string;
};

const DataCyPrefix = 'ContentComponent';

const Content: FunctionComponent<ContentProps> = (props) => {
    return (
        <section className={props.classNames} data-cy={`${DataCyPrefix}Container`}>
            {props.children}
        </section>
    );
};

export default Content;
