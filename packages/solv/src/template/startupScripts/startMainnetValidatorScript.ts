import {
  ACCOUNTS_PATH,
  IDENTITY_KEY_PATH,
  LEDGER_PATH,
  LOG_PATH,
  MAINNET_VALIDATOR_KEY_PATH,
  MAINNET_VALIDATOR_VOTE_KEY_PATH,
} from '@/config/constants'

export const startMainnetValidatorScript = (solanaCLI = 'agave-validator') => {
  const script = `#!/bin/bash
exec ${solanaCLI} \\
--identity ${IDENTITY_KEY_PATH} \\
--vote-account ${MAINNET_VALIDATOR_VOTE_KEY_PATH} \\
--authorized-voter  ${MAINNET_VALIDATOR_KEY_PATH} \\
--log ${LOG_PATH} \\
--accounts ${ACCOUNTS_PATH} \\
--ledger ${LEDGER_PATH} \\
--entrypoint entrypoint.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint2.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint3.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint4.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint5.mainnet-beta.solana.com:8001 \\
--known-validator Certusm1sa411sMpV9FPqU5dXAYhmmhygvxJ23S6hJ24 \\
--known-validator 7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2 \\
--known-validator GdnSyH3YtwcxFvQrVVJMm1JhTS4QVX7MFsX56uJLUfiZ \\
--known-validator CakcnaRDHka2gXyfbEd2d3xsvkJkqsLw2akB3zsN1D2S \\
--expected-genesis-hash 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d \\
--expected-shred-version 50093 \\
--dynamic-port-range 8000-8020 \\
--rpc-bind-address 0.0.0.0 \\
--rpc-port 8899 \\
--wal-recovery-mode skip_any_corrupted_record \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size \\
--block-production-method central-scheduler \\
`
  return script
}
