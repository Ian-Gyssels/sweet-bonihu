import { Helmet } from 'react-helmet-async';

const AdminSEO = () => {
    return (
        <Helmet>
            <meta name="robots" content="noindex, nofollow" />
            <meta name="googlebot" content="noindex, nofollow" />
        </Helmet>
    );
};

export default AdminSEO;