// src/components/ui/Breadcrumb.tsx
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onLogout: () => void
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onLogout }) => {
  return (
    <nav className="flex justify-between items-center text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {index !== items.length - 1 ? (
              <Link
                to={item.path}
                className="text-blue-600 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>

      {/* Menú de usuario */}
      <UserDropdown onLogout={onLogout}/>
    </nav>
  );
};

export default Breadcrumb;