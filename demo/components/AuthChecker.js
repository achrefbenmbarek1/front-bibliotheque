import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthChecker = ({ children }) => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        // Only use the router if we're running in the browser
        const authenticated = Cookies.get('authenticated');
        if (!authenticated && router.pathname !== '/') {
            router.push('/');
            return null;
        }
        else if (authenticated && router.pathname === '/') {
            router.push('/services');
            return null;
        }
    }

    return children;
};

export default AuthChecker;

