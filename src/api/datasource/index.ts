import LocalStorageDS from '@/api/impl/ds/LocalStorageDS';
import DataRepoImpl from '@/api/impl/repo/DataRepoImpl';

const LS = new LocalStorageDS();
const DataRepo = new DataRepoImpl(LS);

export default DataRepo;
