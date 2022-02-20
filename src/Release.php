<?php

declare(strict_types=1);

namespace Major\Readme;

final class Release
{
    public function __construct(
        private readonly ReleaseGroup $release,
        public readonly string $tag,
    ) { }

    public function link(): string
    {
        return "[$this->tag](https://github.com/{$this->release->repo}/releases/tag/{$this->tag})";
    }
}
