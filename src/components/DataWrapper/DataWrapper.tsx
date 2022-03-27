import React, { FunctionComponent } from 'react';

type DataWrapperProps = {
    status: 'loading' | 'error' | 'success' | 'idle';
};

const DataCyPrefix = 'DataWrapperComponent';

const DataWrapper: FunctionComponent<DataWrapperProps> = (props) => {
    const { status } = props;
    if (status === 'loading') {
        return <p data-cy={`${DataCyPrefix}Loading`}>Loading...</p>;
    }
    if (status === 'error') {
        return <p data-cy={`${DataCyPrefix}Error`}>Error...</p>;
    }

    return <>{props.children}</>;
};

export default DataWrapper;
