import {useAppDispatch, useAppSelector} from '@store';
import {Drawer} from 'antd';
import {closeDrawer} from '../store/entity.slice';

export default function EntityDrawer() {
  const {isDrawerOpen} = useAppSelector(state => state.entity);

  const dispatch = useAppDispatch();

  return (
    <Drawer
      closable
      destroyOnClose
      title={<p>Loading Drawer</p>}
      placement="right"
      open={isDrawerOpen}
      loading={false}
      onClose={() => dispatch(closeDrawer())}>
      <span>Button</span>
    </Drawer>
  );
}
