import { type  FC } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface Crumb {
    label: string;
    path?: string;
}

interface Props {
    crumbs: Crumb[];
}

export const BreadCrumbs: FC<Props> = ({ crumbs }) => {
    return (
        <Breadcrumb className="mb-4">
            {/* Главная всегда первая */}
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Главная
            </Breadcrumb.Item>

            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                    <Breadcrumb.Item 
                        key={index} 
                        active={isLast}
                        linkAs={!isLast ? Link : undefined}
                        linkProps={!isLast ? { to: crumb.path || '#' } : undefined}
                    >
                        {crumb.label}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};