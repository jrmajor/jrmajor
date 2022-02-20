<?php

declare(strict_types=1);

namespace Major\Readme\Helpers;

use Psl\Dict;
use Psl\File;
use Psl\Iter;
use Psl\Str;
use Psl\Vec;

/**
 * @return list<string>
 */
function last_lines(string $file, int $count): array
{
    $lines = Str\split(File\read($file), "\n");
    $lines = Vec\filter($lines, fn (string $r) => $r !== '');
    $lines = Dict\slice($lines, Iter\count($lines) - $count);

    return Vec\reverse($lines);
}

/**
 * @param list<string> $pieces
 */
function pretty_join(array $pieces): string
{
    $glueFor = fn (int $n) => match ($n) { 0 => '', 1 => ' and ', default => ', ' };

    $reducer = fn (string $acc, int $n, string $piece) => $piece . $glueFor($n) . $acc;

    return Iter\reduce_with_keys(Vec\reverse($pieces), $reducer, '');
}
