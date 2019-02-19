import Loadable from 'react-loadable';
import Loading from '../../components/Loading/Loading';

export default function LoadableModule(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10000,
  }, opts));
}