import useWindowSize from 'hooks/useWindowSize';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

type SidebarProps = {
    isOpen?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    type?: 'left' | 'right' | 'top' | 'bottom';
    noBackdrop?: boolean;
};

const DataCyPrefix = 'SidebarComponent';

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
    const { isOpen = false, type = 'right', noBackdrop = true, setIsOpen, children } = props;
    const { width } = useWindowSize();
    return (
        <SlidingPanel
            isOpen={isOpen}
            type={type}
            size={width && width <= 500 ? 70 : 30}
            noBackdrop={noBackdrop}
            backdropClicked={() => setIsOpen(false)}
            panelContainerClassName="dark:bg-gray-900 bg-gray-200 border-l-2 border-gray-300"
            data-cy={`${DataCyPrefix}SlidingPanel`}
        >
            {children as ReactElement}
        </SlidingPanel>
    );
};

export default Sidebar;
