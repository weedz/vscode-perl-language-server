package main;
use 5.010;
use strict;
use warnings FATAL => 'all';
use autodie qw(:all);
use diagnostics;
use Data::Dumper;

sub greet
{
    my $x = shift;
    return "Hello, $x!";
}


print Math::add(1,2) . "\n";

print Math::Advanced::sqrt(25) . "\n";



package Math;
use strict;
use warnings;

sub add
{
    my ($x, $y) = @_;

    return $x + $y;
}

sub div { my ($x, $y) = @_; return $x / $y}
sub sub { my ($x, $y) = @_; return $x - $y}


package Math::Advanced;
use strict;
use warnings;

sub sqrt
{
    my $x = shift;
    return CORE::sqrt($x);
}

1;
