import {Inject} from '../../../src/core/di/Inject';

class TargetChild {
}

@Inject(TargetChild)
export class Target {
}