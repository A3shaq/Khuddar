import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { styles } from '../../styles/authStyles'
const MyComponent = ({ leftIcon, leftHandler, hasRight, title, subtitle, }) => {
    const _goBack = () => null;

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <Appbar.Header>
            {
                leftIcon ? <Appbar.Action color="white" icon={leftIcon ? leftIcon : "keyboard-backspace"} onPress={leftHandler ? leftHandler : _goBack} />
                    : <></>
            }
            <Appbar.Content titleStyle={[styles.themeColorwhite,styles.PoppinsMedium]} subtitleStyle={[styles.themeColorwhite,styles.PoppinsMedium]} title={title ? title : ""} subtitle={subtitle ? subtitle : ""} />
            {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
            {
                hasRight ? <Appbar.Action color="white" icon="dots-vertical" onPress={_handleMore} /> : <><Appbar.Action color="white"  /></>
            }

        </Appbar.Header>
    );
};

export default MyComponent;