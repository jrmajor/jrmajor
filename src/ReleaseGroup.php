<?php

declare(strict_types=1);

namespace Major\Readme;

use Carbon\CarbonImmutable;
use Psl\Str;
use Psl\Vec;

final class ReleaseGroup
{
    public readonly CarbonImmutable $date;

    public readonly string $repo;

    /** @var list<Release> */
    public readonly array $releases;

    /** @var list<string> */
    public readonly array $prs;

    public function __construct(string $data)
    {
        $data = Str\split($data, ' ');

        $this->date = new CarbonImmutable($data[0]);
        $this->repo = $data[1];
        $this->releases = Vec\map(
            Str\split($data[2], ','),
            fn (string $v) => new Release($this, $v),
        );
        $this->prs = isset($data[3]) ? Str\split($data[3], ',') : [];
    }

    public function link(): string
    {
        return "[$this->repo](https://github.com/{$this->repo})";
    }
}
