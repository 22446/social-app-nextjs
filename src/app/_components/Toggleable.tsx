'use client'
import React, { useRef } from 'react'; 
import { Panel } from 'primereact/panel';

export default function ToggleableDemo({ children }: any) {
    const ref = useRef<Panel>(null);

    return (
        <>
            <Panel ref={ref} header="Comments" toggleable className="overflow-auto" style={{ maxHeight: '400px', position: 'relative' }}>
                <div className="p-2">
                    {children}
                </div>

        
            </Panel>
        </>
    );
}
