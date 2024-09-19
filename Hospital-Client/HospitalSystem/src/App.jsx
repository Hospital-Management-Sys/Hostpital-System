import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import AdminLogin from './components/admin/AdminLogin';

const App = () => {
    return (
        <Provider store={store}>
            <AdminLogin />
        </Provider>
    );
};

export default App;
