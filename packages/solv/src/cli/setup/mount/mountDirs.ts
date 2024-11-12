import getPreferredDisks, {
  GetPreferredDisksResult,
} from '@/cli/check/mt/getLargestDisk';
import { MNT_DISK_TYPE } from '@/config/enums';
import { updateDefaultConfig } from '@/config/updateDefaultConfig';
import { formatDisk } from '../formatDisk';
import { ensureFstabEntries } from '@/cli/check/ensureMountAndFiles';
import { umount } from '@/cli/check/mt/umount';

const mountDirs = async () => {
  const disks: GetPreferredDisksResult = getPreferredDisks();

  if (disks.disks.length === 0) {
    console.error('No disks found. Please ensure your VM has a disk attached.');
    return;
  }

  const mountPoint = disks.disks[0].mountpoint;

  // Since you have a single 1000GB disk, treat it as a SINGLE disk setup
  console.log('Setting up SINGLE DISK...');
  await updateDefaultConfig({
    MNT_DISK_TYPE: MNT_DISK_TYPE.SINGLE,
  });

  if (!mountPoint.includes('/mnt')) {
    const fileSystem = '/dev/' + disks.disks[0].name;
    formatDisk(fileSystem);
    ensureFstabEntries(fileSystem);
  } else {
    umount(mountPoint);
    const fileSystem = '/dev/' + disks.disks[0].name;
    formatDisk(fileSystem);
    ensureFstabEntries(fileSystem);
  }
};

export default mountDirs;